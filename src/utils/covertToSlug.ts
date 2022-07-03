export function toSlug(test: string) {
  return test !== undefined && test.length > 0
    ? test
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
    : '';
}

function convertToSlug(str: string): string {
  if (str !== undefined && str.length > 0) {
    str = str.toLowerCase();

    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    str = str.replace(/[đĐ]/g, 'd');

    str = str.replace(/([^0-9a-z-\s])/g, '');

    str = str.replace(/(\s+)/g, '-');

    str = str.replace(/-+/g, '-');

    str = str.replace(/^-+|-+$/g, '');

    return str;
  }

  return '';
}

export default convertToSlug;
