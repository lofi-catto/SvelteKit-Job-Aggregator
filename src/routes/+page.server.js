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
				id
				title
				body {
					html
				}
				jobsQuery {
					jobs {
						id
						url
						title
						company_name
						company_logo
						category
						job_type
						publication_date
						candidate_required_location
						salary
						tags
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
