import { LoadingWrap } from '../Loading/Loading.style';
import { ErrorContents } from './Error.style';

const Error = () => {
	return (
		<LoadingWrap>
			<ErrorContents>
				<img src="/assets/404.svg" alt="" />
				<p>존재하지 않는 페이지입니다.</p>
				<img src="/assets/Logo_illus.svg" alt="" />
			</ErrorContents>
		</LoadingWrap>
	);
};

export default Error;
