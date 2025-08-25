interface APIResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

class APIClient {
  private baseURL: string;
  private defaultTimeout = 10000; // 10 seconds
  private defaultRetries = 3;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE || '';
    if (!this.baseURL) {
      throw new Error('NEXT_PUBLIC_API_BASE environment variable is required');
    }
    
    // Remove trailing slash if present
    this.baseURL = this.baseURL.replace(/\/$/, '');
  }

  private async fetchWithTimeout(
    url: string, 
    options: RequestInit & { timeout?: number } = {}
  ): Promise<Response> {
    const { timeout = this.defaultTimeout, ...fetchOptions } = options;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      throw error;
    }
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { 
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
      ...fetchOptions 
    } = options;
    
    const url = `${this.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    let lastError: Error;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...fetchOptions.headers,
          },
          timeout,
          ...fetchOptions,
        });

        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error');
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          return data.data || data; // Handle both wrapped and unwrapped responses
        } else {
          // Handle non-JSON responses
          const text = await response.text();
          return text as unknown as T;
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt === retries) {
          console.error(`API request failed after ${retries} attempts:`, lastError.message);
          throw lastError;
        }
        
        // Wait before retry (exponential backoff)
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        console.warn(`API request attempt ${attempt} failed, retrying in ${delay}ms:`, lastError.message);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError!;
  }

  // Core API methods with improved error handling
  async getMetrics() {
    return this.request('/metrics');
  }
  
  async getPoints() {
    return this.request('/points');
  }
  
  async getIncentives() {
    return this.request('/incentives');
  }
  
  async getDevices() {
    return this.request('/devices');
  }
  
  async getEnergyRecords() {
    return this.request('/energy-records');
  }
  
  // Health check endpoint
  async healthCheck() {
    return this.request('/health', { retries: 1, timeout: 5000 });
  }

  // Get base URL for debugging
  getBaseURL(): string {
    return this.baseURL;
  }
}

export const apiClient = new APIClient();