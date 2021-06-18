const db = require('../db');

class UserController {
  async createUser(req, res) {
    try {
      const {fio, age, birthday, organization} = req.body;
      const userBirthday = new Date(birthday);
      let organizationData = {};

      organizationData = await db.query('SELECT * FROM organizations WHERE name = $1', [organization]);
      if (!organizationData.rows.length) {
        organizationData = await db.query(`INSERT INTO organizations (name) values ($1) RETURNING *`, [organization]);
      }
      const organizationId = organizationData.rows[0].id;
      const newUser = await db.query(
        `INSERT INTO users (fio, age, birthday, organization_id) values ($1, $2, $3, $4) RETURNING *`,
        [fio, age, userBirthday, organizationId]
      );
      res.json(newUser.rows[0]);
    } catch (e) {
      throw new Error()
    }
  }

  async updateUser(req, res) {
    try {
      const {id, fio, age, birthday, organization} = req.body;
      const userBirthday = new Date(birthday);
      let organizationData = {};

      organizationData = await db.query('SELECT * FROM organizations WHERE name = $1', [organization]);
      if (!organizationData.rows.length) {
        organizationData = await db.query(`INSERT INTO organizations (name) values ($1) RETURNING *`, [organization]);
      }
      const organizationId = organizationData.rows[0].id;
      const newUser = await db.query(
        `UPDATE users set fio = $1, age = $2, birthday = $3, organization_id = $4 WHERE id = $5 RETURNING *`,
        [fio, age, userBirthday, organizationId, id]
      );
      res.json(newUser.rows[0]);
    } catch (e) {
      throw new Error()
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const user = await db.query('DELETE FROM users WHERE id = $1', [id]);
      res.json(user.rowCount);
    } catch (e) {
      throw new Error()
    }
  }

  async getUsers(req, res) {
    try {
      const query = 'SELECT u.id, u.fio, u.age, u.birthday, u.organization_id, o.name FROM users u LEFT JOIN organizations o ON u.organization_id = o.id';
      const data = await db.query(query);
      res.json(data.rows);
    } catch (e) {
      throw new Error()
    }
  }

  async getOneUser(req, res) {
    try {
      const id = req.params.id;
      const query = 'SELECT u.id, u.fio, u.age, u.birthday, u.organization_id, o.name FROM users u LEFT JOIN organizations o ON u.organization_id = o.id WHERE u.id = $1';
      const user = await db.query(query, [id]);
      res.json(user.rows[0]);
    } catch (e) {
      throw new Error()
    }
  }

  async getUsersOrganization(req, res) {
    try {
      const id = req.params.id;
      const organization = await db.query('SELECT * FROM organizations WHERE id = $1', [id]);
      const user = await db.query('SELECT * FROM users WHERE organization_id = $1', [organization.rows[0].id]);
      res.json(user.rows);
    } catch (e) {
      throw new Error()
    }
  }
}

module.exports = new UserController();