type RouteParams = {
	myPetId?: string;
	mateId?: string;
	tipId?: string;
	lostId?: string;
};

const labelMappings = {
	'나의 댕냥이': {
		boardType: 'my_pet',
		idType: 'myPetId',
		urlType: 'myPets',
		getId: ({ myPetId }: RouteParams) => myPetId,
	},
	'댕냥 꿀팁': {
		boardType: 'tips',
		idType: 'tipsId',
		urlType: 'tips',
		getId: ({ tipId }: RouteParams) => tipId,
	},
	'댕냥 메이트': {
		boardType: 'mate',
		idType: 'mateId',
		urlType: 'mates',
		getId: ({ mateId }: RouteParams) => mateId,
	},
	'댕냥 미아센터': {
		boardType: 'lost',
		idType: 'id',
		urlType: 'losts',
		getId: ({ lostId }: RouteParams) => lostId,
	},
};

export default labelMappings;
