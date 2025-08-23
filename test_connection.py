#!/usr/bin/env python3
"""
Azure MySQL接続テストスクリプト
.env設定の読み込み確認と接続テスト
"""

import os
import sys
from dotenv import load_dotenv

def test_env_loading():
    """環境変数読み込みテスト"""
    print("=== .env ファイル読み込みテスト ===")
    
    # .env読み込み前の状態
    print("読み込み前:")
    for key in ['MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_DB']:
        value = os.getenv(key, 'NOT SET')
        print(f"  {key}: {value if key != 'MYSQL_PASSWORD' else '***' if value != 'NOT SET' else 'NOT SET'}")
    
    # .env読み込み
    env_file = '.env'
    if not os.path.exists(env_file):
        print(f"\n❌ {env_file} ファイルが見つかりません")
        return False
    
    load_dotenv()
    print(f"\n✅ {env_file} 読み込み完了")
    
    # 読み込み後の状態
    print("読み込み後:")
    config = {}
    for key in ['MYSQL_HOST', 'MYSQL_PORT', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_DB', 'MYSQL_SSL_CA']:
        value = os.getenv(key)
        config[key] = value
        display_value = value if key != 'MYSQL_PASSWORD' else '***' if value else None
        print(f"  {key}: {display_value}")
    
    # 必須項目チェック
    missing = [k for k, v in config.items() if not v and k != 'MYSQL_SSL_CA']
    if missing:
        print(f"\n❌ 不足している環境変数: {missing}")
        return False
    
    print("\n✅ 全ての必須環境変数が設定されています")
    return True, config

def generate_test_commands(config):
    """接続テスト用コマンド生成"""
    print("\n=== 手動接続テストコマンド ===")
    
    # MySQL CLIコマンド
    mysql_cmd = f"mysql -h {config['MYSQL_HOST']} -P {config.get('MYSQL_PORT', 3306)} -u {config['MYSQL_USER']} -p --ssl-mode=REQUIRED"
    
    ssl_ca = config.get('MYSQL_SSL_CA')
    if ssl_ca and os.path.exists(ssl_ca):
        mysql_cmd += f" --ssl-ca={ssl_ca}"
        print(f"✅ SSL証明書ファイル存在: {ssl_ca}")
    else:
        print(f"⚠️  SSL証明書ファイル未設置: {ssl_ca}")
        print("   ↓ 証明書ダウンロードコマンド:")
        print("   curl -O https://dl.cacerts.digicert.com/DigiCertGlobalRootCA.crt.pem")
    
    print(f"\n💻 MySQL CLI接続コマンド:")
    print(f"   {mysql_cmd}")
    print("   ※ パスワードは手動入力")
    
    # データベース指定版
    print(f"\n💻 データベース直接指定版:")
    print(f"   {mysql_cmd} {config['MYSQL_DB']}")
    
    # Pythonテスト用コマンド
    print(f"\n🐍 Python接続テスト:")
    print("   python -c \"")
    print("import mysql.connector")
    print("try:")
    print(f"    conn = mysql.connector.connect(")
    print(f"        host='{config['MYSQL_HOST']}',")
    print(f"        port={config.get('MYSQL_PORT', 3306)},")
    print(f"        user='{config['MYSQL_USER']}',")
    print(f"        password='パスワード',")
    print(f"        database='{config['MYSQL_DB']}',")
    print(f"        ssl_disabled=False")
    if ssl_ca and os.path.exists(ssl_ca):
        print(f"        ssl_ca='{ssl_ca}'")
    print("    )")
    print("    print('✅ 接続成功')")
    print("    conn.close()")
    print("except Exception as e:")
    print("    print(f'❌ 接続失敗: {e}')")
    print("\"")

def suggest_grants():
    """権限設定提案"""
    print("\n=== Azure MySQL権限確認・設定 ===")
    print("接続が拒否される場合、以下を確認してください:")
    print()
    print("1. Azure ポータルでのファイアウォール設定:")
    print("   - 「接続のセキュリティ」→「ファイアウォール規則」")
    print("   - クライアントIPアドレスを追加")
    print("   - または「Azure サービスへのアクセスを許可」を有効化")
    print()
    print("2. ユーザー権限確認（管理者でログイン後実行）:")
    print("   SHOW GRANTS FOR 'tech0gen10student'@'%';")
    print()
    print("3. 必要な権限付与（管理者でログイン後実行）:")
    print("   GRANT ALL PRIVILEGES ON test_tanaka.* TO 'tech0gen10student'@'%';")
    print("   FLUSH PRIVILEGES;")
    print()
    print("4. データベース存在確認:")
    print("   SHOW DATABASES;")
    print("   CREATE DATABASE IF NOT EXISTS test_tanaka;")
    print()
    print("5. SSL接続強制確認:")
    print("   SELECT user, host, ssl_type FROM mysql.user WHERE user='tech0gen10student';")

def main():
    print("🔍 Azure MySQL接続診断ツール")
    print("=" * 50)
    
    # 環境変数テスト
    result = test_env_loading()
    if not result:
        return
    
    success, config = result
    
    # 接続テストコマンド生成
    generate_test_commands(config)
    
    # 権限設定提案
    suggest_grants()
    
    print("\n" + "=" * 50)
    print("🚀 次のステップ:")
    print("1. 上記のMySQL CLIコマンドで手動接続テスト")
    print("2. 接続成功したら: python seed_db.py --employees 100 --months 2")
    print("3. 接続失敗したら: Azure ポータルで権限・ファイアウォール確認")

if __name__ == '__main__':
    main()