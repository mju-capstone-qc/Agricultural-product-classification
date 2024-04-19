import pymysql
from dotenv import load_dotenv
import os

import pymysql.cursors

class Database():
  def __init__(self):
    load_dotenv()
    dbName = os.environ.get('MYSQL_NAME')
    dbPW = os.environ.get('MYSQL_PW')
    self.db = pymysql.connect(host='localhost',
                     port=3306,
                     user='root',
                     db=dbName,
                     passwd=dbPW,
                     charset='utf8')
    self.cursor = self.db.cursor(pymysql.cursors.DictCursor)

  def execute(self, query, args={}):
    self.cursor.execute(query, args)

  def executeOne(self, query, args={}):
    self.cursor.execute(query, args)
    row = self.cursor.fetchone()
    return row
  
  def executeAll(self, query, args={}):
    self.cursor.execute(query, args)
    row = self.cursor.fetchall()
    return row
  
  def commit(self):
    self.db.commit()

  def close(self):
    self.cursor.close()
    self.db.close()