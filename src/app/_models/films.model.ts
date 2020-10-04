export interface film {
    title: number;
    episode_id?: number;
}

export interface filmsList{
    count: number;
    next: string;
    previous: string;
    results: Array<film>;

}