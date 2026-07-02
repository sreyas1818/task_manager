import pymysql
def get_db():
    return pymysql.connect(
        host="localhost",
        database="task_manager",
        port=3306,
        user="root",
        password="root123",
        cursorclass=pymysql.cursors.DictCursor
    )