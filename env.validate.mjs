// 環境変数の検証
function validateEnv() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;
  
  if (!apiBase) {
    console.log('🔧 NEXT_PUBLIC_API_BASE not set - Running in DEMO MODE');
    console.log('📦 All API calls will return mock data');
  } else {
    console.log('🌐 API_BASE configured:', apiBase);
  }
  
  console.log('✅ Environment validation completed');
}

validateEnv();