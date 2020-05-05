"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.lecture.search(ctx.query);
    } else {
      entities = await strapi.services.lecture.find(ctx.query);
    }

    return entities.map((entity) => {
      const lecture = sanitizeEntity(entity, {
        model: strapi.models.lecture,
      });
      if (lecture.user && lecture.user.email) {
        delete lecture.user.email;
      }
      return lecture;
    });
  },
};
