require("dotenv").config(); // Cargar variables de entorno

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://wavynode.com",
  generateRobotsTxt: true,
};
