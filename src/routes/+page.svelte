<script>
  export let data;
  let pages = data.pages;

  let { title, body, jobsQuery } = pages[0];
  let jobs = jobsQuery.jobs;

  let value = '';

  $: filtered = jobs.filter((item) =>
    item.title.toLowerCase().includes(value.toLowerCase())
  );
</script>

<svelte:head>
  <title>Svelte + Hygraph Job Aggregator</title>
</svelte:head>

<main class="max-w-4xl min-h-screen mx-auto py-6 px-4 sm:px-6 lg:px-8">
  <div class="text-center py-12">
    <h1 class="text-4xl lg:text-5xl font-medium text-gray-900">
      {title}
    </h1>
    <div class="text-md lg:text-xl text-gray-600 my-2">
      {body}
    </div>
  </div>
  <div class="my-6">
    <div class="mt-6">
      <div class="relative">
        <input
          type="text"
          class="w-full border border-gray-700 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search for a job"
          bind:value
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-gray-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
      {#each value !== "" ? filtered : jobs as job (job.id)}
        <div
          key={job.id}
          class="shadow-md border border-gray-700 overflow-hidden sm:rounded-lg mt-6 p-6"
        >
          <div
            class="flex flex-col lg:flex-row lg:items-center justify-between space-x-4"
          >
            <div class="flex items-center space-x-6 md:w-1/2">
              <img
                src={job.company_logo}
                alt={job.company_name}
                class="w-12 h-12 rounded-full"
              />

              <div>
                <h4 class="text-xl font-medium text-gray-700">
                  {job.title}
                </h4>

                <div class="text-gray-700">
                  {job.company_name}
                </div>
              </div>
            </div>
            <div class="flex md:flex-col mt-4 lg:mt-0 items-start">
              {#if job.salary}
                <div
                  class="text-gray-700 bg-green-100 text-green-800 font-semibold px-3 py-1 text-center rounded-full inline-block uppercase text-xs"
                >
                  ${job.salary}
                </div>
              {/if}

              {#if job.candidate_required_location}
                <div
                  class="text-gray-700 ml-2 md:ml-0 md:mt-2 bg-pink-100 text-pink-800 font-semibold text-center px-3 py-1 rounded-full inline-block uppercase text-xs"
                >
                  {job.candidate_required_location}
                </div>
              {/if}
            </div>

            <a
              href={job.url}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center uppercase text-xs mt-4 lg:mt-0"
            >
              Apply
            </a>
          </div>

          {#if job.tags}
            <div class="flex flex-wrap mt-6">
              {#each job.tags as tag}
                <div
                  class="text-gray-700 bg-gray-100 text-gray-800 font-semibold px-3 py-1 mr-2 mb-2 text-center rounded-full inline-block uppercase text-xs"
                >
                  {tag}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</main>