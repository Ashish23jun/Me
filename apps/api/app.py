from flask import Flask
from core.config import config
from core.extensions import cors, cache
from modules.spotify.routes import spotify_bp


def create_app() -> Flask:
    app = Flask(__name__)

    app.config["CACHE_TYPE"] = "SimpleCache"
    app.config["CACHE_DEFAULT_TIMEOUT"] = config.CACHE_TTL

    cors.init_app(app, resources={r"/api/*": {"origins": config.CORS_ORIGINS}})
    cache.init_app(app)

    app.register_blueprint(spotify_bp)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
