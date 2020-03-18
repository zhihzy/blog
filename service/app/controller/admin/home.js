'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    //登录
    async checkLogin() {
        let
            userName = this.ctx.request.body.userName,
            userPassword = this.ctx.request.body.userPassword
        let sql = `SELECT userName FROM admin_user WHERE userName='${userName}' AND userPassword=MD5('${userPassword}')`
        let result = await this.app.mysql.query(sql)
        if (result.length > 0) {
            const openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { res: '登录成功', msg: 1, openId }
        } else {
            this.ctx.body = { res: '登录失败', msg: -1 }
        }
    };
    //获得类型
    async getType() {
        const dataType = await this.app.mysql.select('blog_type')
        this.ctx.body = { data: dataType }
    }
    //添加文章
    async addArticle() {
        const tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('blog_article', tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = { insertSuccess, insertId }
    };
    //修改文章
    async updateArticle() {
        const tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.update('blog_article', tmpArticle)
        const updateSuccess = result.affectedRows === 1
        this.ctx.body = { updateSuccess }
    }
    //查看文章列表
    async getList() {
        let sql = `SELECT 
        blog_article.id as id, 
        blog_article.title as title, 
        blog_type.type_name as type_name, 
        FROM_UNIXTIME(blog_article.addTime, '%Y-%m-%d %H:%i:%s') as addTime, 
        blog_article.view_count as count 
        FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.type_id ORDER BY addTime DESC`
        const result = await this.app.mysql.query(sql)
        this.ctx.body = { data: result }
    }
    //删除文章
    async deleteItem() {
        const id = this.ctx.params.id
        const result = await this.app.mysql.delete('blog_article', { id })
        if (result.affectedRows === 1) {
            this.ctx.body = { msg: 1 }
        } else {
            this.ctx.body = { msg: -1 }
        }
    }
    //根据id修改文章
    async updateById(){
        const id = this.ctx.params.id
        let sql = `SELECT 
        blog_article.id as id, 
        blog_article.title as title, 
        blog_article.content as content, 
        blog_article.introduce as introduce, 
        blog_article.view_count as count,
        FROM_UNIXTIME(blog_article.addTime, '%Y-%m-%d %H:%i:%s') as addTime,
        blog_type.type_name as type_name, 
        blog_type.type_id as type_id 
        FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.type_id WHERE blog_article.id=${id}`
        const result= await this.app.mysql.query(sql)
        this.ctx.body={data:result}
    }
}

module.exports = HomeController;
