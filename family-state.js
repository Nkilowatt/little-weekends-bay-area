(function exposeFamilyState(globalObject) {
  const MIN_AGE_MONTHS = 0;
  const MAX_AGE_MONTHS = 83;
  const MAX_CHILDREN = 8;

  function normalizeChildAges(value) {
    if (!Array.isArray(value)) return [];
    return value
      .map(Number)
      .filter((age) => Number.isInteger(age) && age >= MIN_AGE_MONTHS && age <= MAX_AGE_MONTHS)
      .slice(0, MAX_CHILDREN);
  }

  function familyAgeMatchCount(minAgeMonths, maxAgeMonths, childAgesMonths) {
    const minimum = Number(minAgeMonths);
    const maximum = Number(maxAgeMonths);
    if (!Number.isFinite(minimum) || !Number.isFinite(maximum) || minimum > maximum) return 0;
    return normalizeChildAges(childAgesMonths)
      .filter((age) => minimum <= age && age <= maximum)
      .length;
  }

  function familyAgeMatches(minAgeMonths, maxAgeMonths, childAgesMonths) {
    const minimum = Number(minAgeMonths);
    const maximum = Number(maxAgeMonths);
    if (!Number.isFinite(minimum) || !Number.isFinite(maximum) || minimum > maximum) return false;
    const ages = normalizeChildAges(childAgesMonths);
    if (!ages.length) return minimum <= MAX_AGE_MONTHS && maximum >= MIN_AGE_MONTHS;
    return ages.every((age) => minimum <= age && age <= maximum);
  }

  const familyState = Object.freeze({
    MIN_AGE_MONTHS,
    MAX_AGE_MONTHS,
    normalizeChildAges,
    familyAgeMatchCount,
    familyAgeMatches,
  });

  globalObject.LittleWeekendsFamilyState = familyState;
  if (typeof module !== "undefined" && module.exports) module.exports = familyState;
})(typeof globalThis === "undefined" ? window : globalThis);
