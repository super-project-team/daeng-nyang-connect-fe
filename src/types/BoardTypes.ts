import { CommunityState } from '../slice/communitySlice';
export interface PostBoard {
	category?: string;
	title?: string;
	place?: string;
	date?: string;
	time?: string;
	kind?: string;
	breed?: string;
	gender?: string;
	color?: string;
	mobile?: string;
	reward?: number;
	text?: string;
	images?: File[];
}

export interface Board {
	boardId: number;
	category: string;
	text: string;
	createdAt: string;
	nickname: string;
	userThumbnail: string;
	img?: string[];
	images?: LostImage[];

	userId?: number;
	title?: string;
	place?: string;
	likes?: string[] | number;
	comments?: BoardComment[];
	kind?: string;
	breed?: string;
	gender?: string;
	color?: string;
	mobile?: string;
	reward?: number;
	lostDate?: string;
	lostTime?: string;
	phone?: string;
	like?: number;
}

export interface LostImage {
	lostImageId: number;
	url: string;
}

export interface Likes {
	likeId: number;
	userId: number;
}

export interface BoardDetailImg {
	url: string;
}

export interface BoardDetail {
	boardId: number;
	category: string;
	text: string;
	createdAt: string;
	nickname: string;
	userThumbnail: string;
	images: LostImage[];
	img: BoardDetailImg[];
	comments: BoardComment[];
	title?: string;
	likes?: Likes[];

	breed?: string;
	color?: string;
	gender?: string;
	kind?: string;
	lostBoardId?: number;
	lostComments?: string[];
	lostDate?: string;
	lostTime?: string;
	mobile?: string;
	place?: string;
	reward?: number;
	userId?: number;
}

export interface BoardComment {
	commentsId: number;
	userId: number;
	userThumbnail: string;
	likes: string[];
	nickname?: string;
	comment: string;
	createdAt: string;
}

export interface RootState {
	community: CommunityState;
}

export interface BoardSize {
	size: number;
}
