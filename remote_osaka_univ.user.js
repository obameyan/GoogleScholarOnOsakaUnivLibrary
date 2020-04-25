// ==UserScript==
// @name     Google_Scholar_on_Osaka_University_Library
// @version  1
// @include  https://scholar.google*
// @grant    none
// This software is released under the MIT License, see LICENSE.
// ==/UserScript==

function get_gateway_url(url) {
  const url_obj = new URL(url);
  return 'http://' + url_obj.hostname + '.remote.library.osaka-u.ac.jp' + url_obj.pathname + url_obj.search;
}

/*
(function () {
  const links = Array.from(document.getElementsByTagName('a'));
  const re_url = new RegExp('^(https?|ftp):\/\/');
  const journal_links = links.filter(link => {
    const href = link.href
    return href.match(re_url) && (!href.match('google')) && link.hasAttribute("id");
  });
  journal_links.forEach(link => {
    link.href = get_gateway_url(link.href);
  });
})();
*/

function article_page_block(block) {
  if ($(block).find("span.gs_ctc").length == 1) { //[PDF] or [HTML]
    return false;
  } else {
    return true;
  }
}

(function () {
  const re_url = new RegExp('^(https?|ftp):\/\/');
  const article_block = $('#gs_res_ccl_mid .gs_ri');
  article_block.each((i, e) => {
    if (article_page_block(e)) {
      const journal_links = $(e).find("a").filter((i, link) => {
        const href = link.href
        return href.match(re_url) && (!href.match('google')) && link.hasAttribute("id");
      });
      journal_links.each((i, link) => {
        link.href = get_gateway_url(link.href);
      });
    }
  });
})();