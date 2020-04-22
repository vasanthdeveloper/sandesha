export interface TemplateEmbedFieldImpl {
    name: string;
    value: string;
    inline: boolean;
}

export interface TemplateEmbedImpl {
    title: string;
    color: string;
    description: string;
    url: string;
    fields: TemplateEmbedFieldImpl[];
    image: string;
    thumbnail: string;
}

export interface TemplateImpl {
    url: string;
    username?: string;
    content?: string;
    avatarUrl?: string;
    embeds: TemplateEmbedImpl[];
}