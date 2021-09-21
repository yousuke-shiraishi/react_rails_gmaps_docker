Gmapsのバックエンド部分
Dockerでnginxに対応するまたにpuma.rbの設定を変更
AWSに対応するためにaws-sdkを丸っと入れているが
本番環境では調整する。
開発環境なので動かすときはdocker-compose up -d
をした後に　apiのプロセスに入って
rails db:create
rails db:migrate
をして下さい。
