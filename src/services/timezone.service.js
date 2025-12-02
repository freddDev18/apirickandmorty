const queries = require('../db/users/queries/timezone.queries.js');

async function create(data) {
  const result = await queries.insert(data);

  const rows = Array.isArray(result) ? result : [result];

  const normalized = rows.map((r) => {
    const plain = r && typeof r === 'object' ? r : {};
    return {
      id: plain.id,
      timeZone: plain.timeZone,
      date: plain.date instanceof Date ? plain.date.toISOString() : plain.date,
    };
  });

  return normalized;
}

module.exports = {
  create,
};
