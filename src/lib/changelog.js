// User-facing changelog content, localized for every supported locale.
// Entries describe changes from the reader's point of view. Keep them free of
// internal implementation detail and free of em-dashes in copy.

export const changelogUi = {
  en: {
    pageTitle: "Changelog · Privacy Filter",
    metaDescription:
      "Product updates and improvements to Privacy Filter, the free in-browser PII detection tool.",
    heading: "Changelog",
    intro:
      "What is new in Privacy Filter. Product updates written for people who use the tool.",
    backHome: "Back to Privacy Filter",
    navChangelog: "Changelog"
  },
  ja: {
    pageTitle: "変更履歴 · Privacy Filter",
    metaDescription:
      "無料のブラウザ内PII検出ツールであるPrivacy Filterの製品アップデートと改善点。",
    heading: "変更履歴",
    intro:
      "Privacy Filterの最新情報。ツールを利用する方々に向けて書かれた製品アップデートです。",
    backHome: "Privacy Filterに戻る",
    navChangelog: "変更履歴"
  },
  "zh-CN": {
    pageTitle: "更新日志 · Privacy Filter",
    metaDescription:
      "Privacy Filter 的产品更新与改进，这是一款免费的浏览器内 PII 检测工具。",
    heading: "更新日志",
    intro: "Privacy Filter 有哪些新变化。为使用该工具的用户撰写的产品更新。",
    backHome: "返回 Privacy Filter",
    navChangelog: "更新日志"
  },
  "zh-TW": {
    pageTitle: "更新日誌 · Privacy Filter",
    metaDescription:
      "Privacy Filter 的產品更新與改進，這是一款免費的瀏覽器內 PII 偵測工具。",
    heading: "更新日誌",
    intro: "Privacy Filter 有哪些新變化。為使用此工具的使用者撰寫的產品更新。",
    backHome: "返回 Privacy Filter",
    navChangelog: "更新日誌"
  },
  es: {
    pageTitle: "Registro de cambios · Privacy Filter",
    metaDescription:
      "Actualizaciones y mejoras de producto de Privacy Filter, la herramienta gratuita de detección de PII en el navegador.",
    heading: "Registro de cambios",
    intro:
      "Novedades de Privacy Filter. Actualizaciones de producto escritas para las personas que usan la herramienta.",
    backHome: "Volver a Privacy Filter",
    navChangelog: "Registro de cambios"
  },
  de: {
    pageTitle: "Änderungsprotokoll · Privacy Filter",
    metaDescription:
      "Produktupdates und Verbesserungen für Privacy Filter, das kostenlose Tool zur PII-Erkennung direkt im Browser.",
    heading: "Änderungsprotokoll",
    intro:
      "Was es Neues bei Privacy Filter gibt. Produktupdates, geschrieben für Menschen, die das Tool nutzen.",
    backHome: "Zurück zu Privacy Filter",
    navChangelog: "Änderungsprotokoll"
  },
  fr: {
    pageTitle: "Journal des modifications · Privacy Filter",
    metaDescription:
      "Mises à jour et améliorations de Privacy Filter, l'outil gratuit de détection des données personnelles directement dans le navigateur.",
    heading: "Journal des modifications",
    intro:
      "Les nouveautés de Privacy Filter. Des mises à jour de produit rédigées pour les personnes qui utilisent l'outil.",
    backHome: "Retour à Privacy Filter",
    navChangelog: "Journal des modifications"
  },
  ru: {
    pageTitle: "Журнал изменений · Privacy Filter",
    metaDescription:
      "Обновления и улучшения продукта Privacy Filter, бесплатного инструмента для обнаружения персональных данных прямо в браузере.",
    heading: "Журнал изменений",
    intro:
      "Что нового в Privacy Filter. Обновления продукта, написанные для тех, кто пользуется инструментом.",
    backHome: "Назад к Privacy Filter",
    navChangelog: "Журнал изменений"
  },
  "pt-BR": {
    pageTitle: "Registro de alterações · Privacy Filter",
    metaDescription:
      "Atualizações e melhorias de produto do Privacy Filter, a ferramenta gratuita de detecção de PII no navegador.",
    heading: "Registro de alterações",
    intro:
      "O que há de novo no Privacy Filter. Atualizações de produto escritas para as pessoas que usam a ferramenta.",
    backHome: "Voltar para o Privacy Filter",
    navChangelog: "Registro de alterações"
  },
  ar: {
    pageTitle: "سجل التغييرات · Privacy Filter",
    metaDescription:
      "تحديثات المنتج والتحسينات على Privacy Filter، الأداة المجانية للكشف عن البيانات الشخصية داخل المتصفح.",
    heading: "سجل التغييرات",
    intro:
      "ما الجديد في Privacy Filter. تحديثات المنتج مكتوبة للأشخاص الذين يستخدمون الأداة.",
    backHome: "العودة إلى Privacy Filter",
    navChangelog: "سجل التغييرات"
  },
  ko: {
    pageTitle: "변경 로그 · Privacy Filter",
    metaDescription:
      "브라우저 내에서 작동하는 무료 PII 탐지 도구인 Privacy Filter의 제품 업데이트 및 개선 사항입니다.",
    heading: "변경 로그",
    intro:
      "Privacy Filter의 새로운 소식. 도구를 사용하는 분들을 위해 작성된 제품 업데이트입니다.",
    backHome: "Privacy Filter로 돌아가기",
    navChangelog: "변경 로그"
  }
};

// Newest release first. `date` is an ISO date (used for <time> and schema).
export const changelogEntries = [
  {
    version: "2026.07",
    date: "2026-07-10",
    changes: {
      en: [
        "The blog now has an RSS feed you can follow in any reader.",
        "Shared links now show a preview image and a site icon.",
        "Faster, more reliable discovery in search engines and AI assistants."
      ],
      ja: [
        "ブログにRSSフィードが追加され、任意のリーダーで購読できるようになりました。",
        "共有リンクにプレビュー画像とサイトアイコンが表示されるようになりました。",
        "検索エンジンやAIアシスタントでの発見がより速く、より確実になりました。"
      ],
      "zh-CN": [
        "博客现已提供 RSS 订阅源，可在任意阅读器中关注。",
        "分享链接现在会显示预览图和站点图标。",
        "在搜索引擎和 AI 助手中的发现更快、更可靠。"
      ],
      "zh-TW": [
        "部落格現已提供 RSS 訂閱源，可在任意閱讀器中追蹤。",
        "分享連結現在會顯示預覽圖與網站圖示。",
        "在搜尋引擎與 AI 助理中的探索更快、更可靠。"
      ],
      es: [
        "El blog ahora tiene un feed RSS que puedes seguir en cualquier lector.",
        "Los enlaces compartidos ahora muestran una imagen de vista previa y un icono del sitio.",
        "Detección más rápida y fiable en motores de búsqueda y asistentes de IA."
      ],
      de: [
        "Der Blog verfügt jetzt über einen RSS-Feed, den du in jedem Reader abonnieren kannst.",
        "Geteilte Links zeigen jetzt ein Vorschaubild und ein Website-Symbol an.",
        "Schnellere, zuverlässigere Auffindbarkeit in Suchmaschinen und KI-Assistenten."
      ],
      fr: [
        "Le blog dispose désormais d'un flux RSS que vous pouvez suivre dans n'importe quel lecteur.",
        "Les liens partagés affichent maintenant une image d'aperçu et une icône du site.",
        "Une découverte plus rapide et plus fiable dans les moteurs de recherche et les assistants IA."
      ],
      ru: [
        "В блоге теперь есть RSS-лента, на которую можно подписаться в любом ридере.",
        "В общих ссылках теперь отображается изображение предпросмотра и значок сайта.",
        "Более быстрое и надежное обнаружение в поисковых системах и ИИ-ассистентах."
      ],
      "pt-BR": [
        "O blog agora tem um feed RSS que você pode seguir em qualquer leitor.",
        "Os links compartilhados agora mostram uma imagem de visualização e um ícone do site.",
        "Descoberta mais rápida e confiável em mecanismos de busca e assistentes de IA."
      ],
      ar: [
        "أصبحت المدونة الآن تحتوي على خلاصة RSS يمكنك متابعتها في أي قارئ.",
        "أصبحت الروابط المشاركة الآن تعرض صورة معاينة وأيقونة الموقع.",
        "اكتشاف أسرع وأكثر موثوقية في محركات البحث ومساعدي الذكاء الاصطناعي."
      ],
      ko: [
        "이제 블로그에 RSS 피드가 제공되어 원하는 리더에서 구독할 수 있습니다.",
        "공유 링크에 미리보기 이미지와 사이트 아이콘이 표시됩니다.",
        "검색 엔진과 AI 어시스턴트에서 더 빠르고 안정적으로 검색됩니다."
      ]
    }
  }
];

export function changelogUiFor(locale) {
  return changelogUi[locale] ?? changelogUi.en;
}

export function changelogChangesFor(entry, locale) {
  return entry.changes[locale] ?? entry.changes.en;
}
