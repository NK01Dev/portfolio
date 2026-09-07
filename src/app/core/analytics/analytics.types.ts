export type AnalyticsEventName =
    | 'section_view'
    | 'navigation_click'
    | 'project_view'
    | 'project_demo_click'
    | 'project_github_click'
    | 'resume_download'
    | 'contact_submit'
    | 'email_click'
    | 'social_click'
    | 'language_change'
    | 'theme_change';

export interface AnalyticsEventParams {
    [key: string]: string | number | boolean | undefined;
}