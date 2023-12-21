import { useQueries } from 'react-query';
import Banner from '../../components/home/Banner/Banner';
import SectionCommunity from '../../components/home/SectionCommunity/SectionCommunity';
import SectionFindNew from '../../components/home/SectionFindNew/SectionFindNew';
import SectionReview from '../../components/home/SectionReview/SectionReview';
import { getReviews } from '../../api/reviewApi';
import { getNewFamily } from '../../api/newFamilyApi';
import Loading from '../Loading/Loading';

const Home = () => {
	const results = useQueries([
		{ queryKey: 'getReviews', queryFn: getReviews },
		{ queryKey: 'getNewFamily', queryFn: getNewFamily },
	]);

	const loading = results.some((result) => result.isLoading);

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
