import defaultSettings from "@/settings";

const title = defaultSettings.title;

/**
 * 获取标题title
 * @param {String} pageTitle 路由meta的title
 * @returns
 */
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
