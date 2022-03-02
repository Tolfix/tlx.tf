export interface IRedirect
{
    id: string;
    redirect: string;
    usedBy: Array<string>;
    created_at: Date;
}