export interface ApiPort {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
  delete(url: string): Promise<void>;
}