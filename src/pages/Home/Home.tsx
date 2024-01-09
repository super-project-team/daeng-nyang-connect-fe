import { useQueries } from 'react-query';
import Banner from '../../components/home/Banner/Banner';
import SectionCommunity from '../../components/home/SectionCommunity/SectionCommunity';
import SectionFindNew from '../../components/home/SectionFindNew/SectionFindNew';
import SectionReview from '../../components/home/SectionReview/SectionReview';
import { getReviews } from '../../api/reviewApi';
import { getNewFamily } from '../../api/newFamilyApi';
import Loading from '../Loading/Loading';
import { useEffect } from 'react';
import localToken from '../../api/LocalToken';

const Home = () => {
	const results = useQueries([
		{ queryKey: 'getReviews', queryFn: getReviews },
		{ queryKey: 'getNewFamily', queryFn: getNewFamily },
	]);

	const loading = results.some((result) => result.isLoading);

	useEffect(() => {
		if (document.cookie.includes('access')) {
			const cookie = document.cookie;
			const accessTokenMatch = cookie.match(/access_token=([^;]*)/);
			const accessToken = accessTokenMatch ? accessTokenMatch[1] : null;

			const refreshTokenMatch = cookie.match(/refresh_token=([^;]*)/);
			const refreshToken = refreshTokenMatch ? refreshTokenMatch[1] : null;
			if (accessToken) localStorage.setItem('access_token', accessToken);
			if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
		}
	}, []);
	if (loading) {
		return <Loading />;
	}

	if (loading) {
		return <Loading />;
	}
	return (
		<>
			<Banner />
			<SectionCommunity />
			<SectionFindNew />
			<SectionReview />
		</>
	);
};

export default Home;
