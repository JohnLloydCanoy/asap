from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Core Application Settings
    APP_NAME: str = "ASAP API"


    BLUESKY_BASE_URL: str = "https://bsky.social/xrpc"

    # Tell Pydantic to read from the .env file
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

# Create a global instance of the settings to import everywhere else
settings = Settings()