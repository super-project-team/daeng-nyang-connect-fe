import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: any) {
	app.use(
		'https://daeng-nyang-be-qyu5xzcspa-du.a.run.app/api', // 프록시할 API 경로
		createProxyMiddleware({
			target: 'https://daeng-nyang-be-qyu5xzcspa-du.a.run.app',
			changeOrigin: true,
		}),
	);
};
