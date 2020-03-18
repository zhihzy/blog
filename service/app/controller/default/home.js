'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi egg'
  }
  async getInfo() {
    let sql = `SELECT 
    blog_article.id as id, 
    blog_article.type_id as type_id, 
    blog_article.title as title, 
    FROM_UNIXTIME(blog_article.addTime, '%Y-%m-%d %H:%i:%s') as addTime,
    blog_article.introduce as introduce, 
    blog_article.content as content 
    FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.type_id`
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }
  async getDetailsById(){
    let id=this.ctx.params.id
    let sql = `SELECT 
    blog_article.id as id, 
    blog_article.title as title, 
    blog_article.content as content, 
    blog_article.view_count as count,
    blog_article.introduce as introduce, 
    FROM_UNIXTIME(blog_article.addTime, '%Y-%m-%d %H:%i:%s') as addTime,
    blog_type.type_name as type_name 
    FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.type_id WHERE blog_article.id=${id}`
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {data:result}
  }
}

module.exports = HomeController;
