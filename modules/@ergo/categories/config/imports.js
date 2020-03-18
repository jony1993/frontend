/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const Pages = {
    Categories: () => import('@Categories/pages/categories/index').then(m => m.default || m),
    CategoryEdit: () => import('@Categories/pages/categories/_category/_id').then(m => m.default || m),
};

export const Tabs = {
    CategoryGridTab: () => import('@Categories/components/Tabs/CategoryGridTab').then(m => m.default || m),
    CategoryBaseTab: () => import('@Categories/components/Tabs/CategoryBaseTab').then(m => m.default || m),
    CategoryTranslationsTab: () => import('@Categories/components/Tabs/CategoryTranslationsTab').then(m => m.default || m),
};

export const Icons = {
    Templates: () => import('@Core/components/Icons/Menu/IconTemplates'),
};
