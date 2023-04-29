import { GraphQLClient, gql } from 'graphql-request';
import { HYGRAPH_CONTENT_ENDPOINT, HYGRAPH_CONTENT_TOKEN } from '$env/static/private';

export async function load() {
	const hygraph = new GraphQLClient(HYGRAPH_CONTENT_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${HYGRAPH_CONTENT_TOKEN}`
		}
	});

	const QUERY = gql`
		{
			pages {
				body
				id
				title
				jobsQuery {
					jobs {
						candidate_required_location
						category
						company_logo
						company_name
						description
						id
						job_type
						publication_date
						salary
						title
						tags
						url
					}
				}
			}
		}
	`;

	const { pages } = await hygraph.request(QUERY);

	return {
		pages
	};
}
