# Azure App Service 設定スクリプト

## 🎯 SCM Container Restart 問題解消のための設定

### 必須設定 (Azure Portal で実行)

Azure Portal → App Services → app-002-gen10-step3-2-node-oshima2 → Configuration

#### 1. General Settings
```
スタック: Node.js
メジャーバージョン: Node
マイナーバージョン: 20 LTS
スタートアップコマンド: bash startup.sh
プラットフォーム: Linux
Always On: On (推奨)
```

#### 2. Application Settings (必須)
以下の設定を追加/更新してください：

| 名前 | 値 | 説明 |
|------|-----|------|
| `WEBSITE_NODE_DEFAULT_VERSION` | `~20` | Node.js 20固定（必須） |
| `WEBSITES_PORT` | `3000` | Next.js ポート |
| `SCM_DO_BUILD_DURING_DEPLOYMENT` | `false` | Oryxビルド抑止（必須） |
| `WEBSITE_RUN_FROM_PACKAGE` | `1` | ZIPファイル実行（必須） |
| `NEXT_PUBLIC_API_URL` | `https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net` | バックエンドAPI URL |

#### 3. Azure CLI 自動設定スクリプト

```bash
#!/bin/bash
# Azure App Service 設定自動化スクリプト

RG="YOUR_RESOURCE_GROUP"  # リソースグループ名を入力してください
APP="app-002-gen10-step3-2-node-oshima2"

echo "🔧 Setting up Azure App Service for stable deployment..."

# 必須のアプリケーション設定
az webapp config appsettings set --resource-group $RG --name $APP --settings \
  WEBSITE_NODE_DEFAULT_VERSION="~20" \
  WEBSITES_PORT="3000" \
  SCM_DO_BUILD_DURING_DEPLOYMENT="false" \
  WEBSITE_RUN_FROM_PACKAGE="1" \
  NEXT_PUBLIC_API_URL="https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net"

# スタートアップコマンド設定
az webapp config set --resource-group $RG --name $APP --startup-file "bash startup.sh"

# HTTPS強制
az webapp update --resource-group $RG --name $APP --https-only true

echo "✅ Configuration completed!"
echo "📝 Please restart the app service manually in Azure Portal after this configuration"
echo "⚠️ Wait 2-3 minutes after restart before attempting deployment"
```

### 🚨 重要な注意事項

#### 設定変更後の手順
1. **設定保存後、アプリを手動で再起動**
2. **再起動から2-3分待機してからデプロイ実行**
3. **デプロイ中は他の管理操作を実行しない**

#### 設定確認コマンド
```bash
# 設定値確認
az webapp config appsettings list --resource-group $RG --name $APP --query "[?name=='WEBSITE_NODE_DEFAULT_VERSION' || name=='SCM_DO_BUILD_DURING_DEPLOYMENT' || name=='WEBSITE_RUN_FROM_PACKAGE']"

# アプリ状態確認
az webapp show --resource-group $RG --name $APP --query "state"
```

### 🔍 トラブルシューティング設定

#### ログ設定の有効化
```bash
# ログ設定
az webapp log config --resource-group $RG --name $APP \
  --application-logging filesystem \
  --level information \
  --web-server-logging filesystem

# ログストリーミング開始
az webapp log tail --resource-group $RG --name $APP
```

#### 診断用の追加設定 (オプション)
```bash
# 診断用の追加設定
az webapp config appsettings set --resource-group $RG --name $APP --settings \
  WEBSITE_HTTPLOGGING_RETENTION_DAYS="7" \
  WEBSITE_TIME_ZONE="Tokyo Standard Time" \
  WEBSITE_LOAD_USER_PROFILE="1"
```

### 📋 設定完了チェックリスト

設定後、以下を確認してください：

- [ ] WEBSITE_NODE_DEFAULT_VERSION = ~20
- [ ] SCM_DO_BUILD_DURING_DEPLOYMENT = false  
- [ ] WEBSITE_RUN_FROM_PACKAGE = 1
- [ ] WEBSITES_PORT = 3000
- [ ] スタートアップコマンド = bash startup.sh
- [ ] Node.js バージョン = 20 LTS
- [ ] Always On = On
- [ ] アプリが再起動済み
- [ ] 再起動から2-3分経過

### 🎬 デプロイ実行前の最終確認

1. **App Service の状態確認**
   ```bash
   az webapp show --resource-group $RG --name $APP --query "state"
   # → "Running" であることを確認
   ```

2. **現在実行中のデプロイがないことを確認**
   ```bash
   az webapp deployment list --resource-group $RG --name $APP --query "[0].status"
   # → "Success" または "Failed" (進行中でないこと)
   ```

3. **GitHub Actions でデプロイ実行**
   - Repository → Actions → "Build and deploy Node.js app to Azure Web App"
   - "Run workflow" をクリック
   - "main" ブランチで実行

### 🆘 緊急時の復旧手順

デプロイが失敗し続ける場合：

```bash
# 1. アプリの停止
az webapp stop --resource-group $RG --name $APP

# 2. 設定リセット
az webapp config appsettings delete --resource-group $RG --name $APP --setting-names SCM_DO_BUILD_DURING_DEPLOYMENT WEBSITE_RUN_FROM_PACKAGE

# 3. 基本設定を再適用
az webapp config appsettings set --resource-group $RG --name $APP --settings \
  WEBSITE_NODE_DEFAULT_VERSION="~20" \
  SCM_DO_BUILD_DURING_DEPLOYMENT="false" \
  WEBSITE_RUN_FROM_PACKAGE="1"

# 4. アプリの開始
az webapp start --resource-group $RG --name $APP

# 5. 2分待機してから再デプロイ
```

設定が完了したら、GitHub Actions の workflow_dispatch でデプロイをテストしてください。