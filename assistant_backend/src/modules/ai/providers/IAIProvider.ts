export interface IProcessNewsDTO {
  text: string;
  systemPrompt: string;
}

export interface IAIProviderResponse {
  category: string;
  scope_level: string;
  political_bias: string;
  summary_short: string;
  summary_medium: string;
  summary_long: string;
  tags: string[];
  is_realtime_alert: boolean;
}

export interface IAIProvider {
  processNews(data: IProcessNewsDTO): Promise<IAIProviderResponse>;
}
