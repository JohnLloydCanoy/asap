#!/bin/bash
# A simple script to generate the ASAP FastAPI structure

mkdir -p backend/app/{core,api/v1,models,schemas,services,workers}
touch backend/app/__init__.py
touch backend/app/main.py
touch backend/app/core/{__init__.py,config.py,security.py,database.py}
touch backend/app/api/{__init__.py,router.py}
touch backend/app/api/v1/{__init__.py,auth.py,connect.py,scheduling.py,ai_agent.py}
touch backend/app/models/{__init__.py,user.py,post.py}
touch backend/app/schemas/{__init__.py,user.py,post.py}
touch backend/app/services/{__init__.py,ai_engine.py}
touch backend/app/workers/{__init__.py,celery_app.py,tasks.py}

echo "FastAPI structure generated successfully!"