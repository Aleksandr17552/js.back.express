const db = require('../db');

class OrganizationsController {
  async createOrganization(req, res) {
    try {
      const {name} = req.body;
      const newOrganization = await db.query(`INSERT INTO organizations (name) values ($1) RETURNING *`, [name]);
      res.json(newOrganization.rows[0]);
    } catch (e) {
      throw new Error()
    }
  }

  async updateOrganization(req, res) {
    try {
      const {id, name} = req.body;
      const newOrganization = await db.query(`UPDATE organizations set name = $1 WHERE id = $2 RETURNING *`, [name, id]);
      res.json(newOrganization.rows[0]);
    } catch (e) {
      throw new Error()
    }
  }

  async deleteOrganization(req, res) {
    try {
      const id = req.params.id;
      const organization = await db.query('DELETE FROM organizations WHERE id = $1', [id]);
      res.json(organization.rowCount);
    } catch (e) {
      throw new Error()
    }
  }

  async getOrganization(req, res) {
    try {
      const organizations = await db.query('SELECT * FROM organizations');
      res.json(organizations.rows);
    } catch (e) {
      throw new Error()
    }
  }

  async getOneOrganization(req, res) {
    try {
      const id = req.params.id;
      const organization = await db.query('SELECT * FROM organizations WHERE id = $1', [id]);
      res.json(organization.rows[0]);
    } catch (e) {
      throw new Error()
    }
  }

  async getOrganizationUser(req, res) {
    try {
      const id = req.params.id;
      const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      const organization = await db.query('SELECT * FROM organizations WHERE id = $1', [user.rows[0].organization_id]);
      res.json(organization.rows[0]);
    } catch (e) {
      throw new Error()
    }
  }
}

module.exports = new OrganizationsController();