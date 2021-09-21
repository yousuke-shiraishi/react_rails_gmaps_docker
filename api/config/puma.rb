
# max_threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
# min_threads_count = ENV.fetch("RAILS_MIN_THREADS") { max_threads_count }
# threads min_threads_count, max_threads_count

# worker_timeout 3600 if ENV.fetch("RAILS_ENV", "development") == "development"

# port ENV.fetch("PORT") { 3000 }

# environment ENV.fetch("RAILS_ENV") { "development" }

# pidfile ENV.fetch("PIDFILE") { "tmp/pids/server.pid" }

# Specifies the number of `workers` to boot in clustered mode.
# Workers are forked web server processes. If using threads and workers together
# the concurrency of the application would be max `threads` * `workers`.
# Workers do not work on JRuby or Windows (both of which do not support
# processes).
#
## workers ENV.fetch("WEB_CONCURRENCY") { 2 }

# cert = "/Users/yosuke-s/example.com.pem"
# key = "/Users/yosuke-s/example.com-key.pem"
# ssl_bind "0.0.0.0", 9292, cert: cert, key: key

# plugin :tmp_restart

threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }.to_i
threads threads_count, threads_count
# port        ENV.fetch("PORT") { 3000 }
environment ENV.fetch("RAILS_ENV") { "development" }
plugin :tmp_restart

app_root = File.expand_path("../..", __FILE__)

bind "unix://#{app_root}/tmp/sockets/puma.sock"


stdout_redirect "#{app_root}/log/puma.stdout.log", "#{app_root}/log/puma.stderr.log", true
