"""update social platforms constraint

Revision ID: 13d3dc20d96b
Revises: 729fd972dbbb
Create Date: 2026-06-03 20:57:09.989724

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '13d3dc20d96b'
down_revision: Union[str, Sequence[str], None] = '729fd972dbbb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Drop the old strict rule
    op.execute("ALTER TABLE social_accounts DROP CONSTRAINT IF EXISTS check_valid_social_platform;")
    # Add your new Tier 1 platform rules
    op.execute("ALTER TABLE social_accounts ADD CONSTRAINT check_valid_social_platform CHECK (platform IN ('Bluesky', 'Discord', 'Telegram', 'Mastodon', 'Slack', 'Nostr'));")

def downgrade() -> None:
    # Drop the new rule and revert to the old one if we ever need to undo
    op.execute("ALTER TABLE social_accounts DROP CONSTRAINT IF EXISTS check_valid_social_platform;")
    op.execute("ALTER TABLE social_accounts ADD CONSTRAINT check_valid_social_platform CHECK (platform IN ('Facebook', 'Twitter', 'Instagram', 'LinkedIn'));")
