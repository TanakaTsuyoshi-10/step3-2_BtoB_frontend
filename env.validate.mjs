// 環境変数の検証
function validateEnv() {
  const requiredEnvs = ['NEXT_PUBLIC_API_BASE'];
  const missingEnvs = requiredEnvs.filter(env => !process.env[env]);
  
  if (missingEnvs.length > 0) {
    console.warn('⚠️  Missing environment variables:', missingEnvs);
    console.warn('Using default values for missing environment variables.');
  }
  
  // デフォルト値の設定
  if (!process.env.NEXT_PUBLIC_API_BASE) {
    process.env.NEXT_PUBLIC_API_BASE = 'https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1';
  }
  
  console.log('✅ Environment validation completed');
}

validateEnv();