# react_rails_gmaps_docker
https://github.com/yousuke-shiraishi/gmap2
のアプリをRails api とReactで書き直しました。
ReactはTypeScriptで作成。
構成としてdockerを使ってWebサーバにnginxを使用。
TerraformでAWSにデプロイしたい。
本来ならローカルストレージではなくuniversal-cookieを使うべき
https://www.npmjs.com/package/universal-cookie

あとsliceもgoogle mapの部分もsliceに切り出してconfigureStoreにまとめるべきです。
何かがーーと作ってそのまんまになっているがそのうち纏めます。

アプリの実行時の画像
<img src="https://github.com/yousuke-shiraishi/react_rails_gmaps/blob/main/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88_2021-09-09_8.59.07.png" width="350px">
