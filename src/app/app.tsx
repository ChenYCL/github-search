import {useCallback, useRef, useState} from "react";
import {Item} from "api/type";
import styles from "./app.module.css";
import Search, {SearchRef} from "components/search";
import Card from "components/card";
import Tabs from "components/tabs";
import EmptyData from "components/empty";
import Pagination from "components/pagination";
import Footer from "components/footer";


import GithubSearch from 'api/search'

const githubSearchInstance = new GithubSearch('')



enum GitHubResource {
  Users = "users",
  Repositories = "repositories",
  Issues = "issues",
  Commits = "commits",
  Topics = "topics",
}

const options = [
  {value: "repositories", label: "Repo"},
  {value: "commits", label: "Commits"},
  {value: "issues", label: "Issues"},
  {value: "topics", label: "Topics"},
  {value: "users", label: "Users"}
];

const cachedResults = new Map<string, Array<Item>>()

const App = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [per_page, setPageSize] = useState(30);
  const [sort, setSort] = useState<"stars" | "forks" | "updated" | 'best match'>('best match');
  const [order, setOrder] = useState<'desc' | 'asc'>('desc');
  const [searchLists, updateList] = useState<Array<Item>>([])
  const [resultsCounts, updateResultsCount] = useState<Record<string, number>>({
    repositories: 0,
    // code: 0,
    commits: 0,
    issues: 0,
    topics: 0,
    users: 0,
  });
  const searchRef = useRef<SearchRef | null>(null);

  const searchParam = new URLSearchParams(location.search)
  const type = searchParam.get('type')
  const [activeCategory, setActiveCategory] = useState<GitHubResource | string>(type || "repositories");
  const handleOptionChange = async (option: string) => {
    if(option === activeCategory) return
     setActiveCategory(option);
      handleClickPage(pageNum,option)
  };


  const handleSearch = useCallback(async (query: string) => {
    console.log(`enter search: ${query}`)
    const repositoriesRet = await githubSearchInstance.search('repositories', query, {
      pageNum,
      per_page,
      sort,
      order
    })
    const commitsRet = await githubSearchInstance.search('commits', query, {
      pageNum,
      per_page,
      sort,
      order,
    })
    const issuesRet = await githubSearchInstance.search('issues', query, {
      pageNum,
      per_page,
      sort,
      order,
    })
    const topicsRet = await githubSearchInstance.search('topics', query, {
      pageNum,
      per_page,
      sort,
      order,
    })
    const usersRet = await githubSearchInstance.search('users', query, {
      pageNum,
      per_page,
      sort,
      order,
    })
    cachedResults.set('repositories', repositoriesRet.items)
    cachedResults.set('commits', commitsRet.items)
    cachedResults.set('issues', issuesRet.items)
    cachedResults.set('topics', topicsRet.items)
    cachedResults.set('users', usersRet.items)

    switch (activeCategory) {
      case 'users':
        updateList(usersRet.items)
        break;
      case  'commits':
        updateList(commitsRet.items)
        break;
      case 'issues':
        updateList(issuesRet.items)
        break;
      case 'topics':
        updateList(topicsRet.items)
        break;
      default:
        updateList(repositoriesRet.items)
    }
    updateResultsCount({
      repositories: repositoriesRet.total_count,
      commits: commitsRet.total_count,
      issues: issuesRet.total_count,
      topics: topicsRet.total_count,
      users: usersRet.total_count,
    })
  }, [activeCategory, pageNum, per_page, sort, order])

  const handleLoadingChange = (loading: boolean) => {
    setLoading(loading);
  };

  const handleClickPage = async (_page: number, type?: string) => {
    // console.log
    if(searchRef.current?.query =='') return
    setPageNum(_page)
    handleLoadingChange(true)
    const ret = await githubSearchInstance.search(type??activeCategory, searchRef.current!.query ?? '', {
      pageNum: _page,
      per_page,
      sort,
      order,
    })
    handleLoadingChange(false)
    console.log(ret.items)
    cachedResults.set(activeCategory, ret.items)
    updateList(ret.items)
  }


  return (
    <div className='overflow-y-hidden'>
      <header className={styles.header}>
        <h1
          className="text-5xl mb-3 font-bold text-center text-white bg-gradient-to-r from-red-400 to-orange-800 bg-clip-text animate-pulse">Github
          Search</h1>
        <Search ref={searchRef} onSearch={handleSearch}
                onLoadingChange={handleLoadingChange}/>
        <Tabs options={options}
              activeOption={activeCategory}
              onChange={handleOptionChange}
              resultsCounts={resultsCounts}
        />
      </header>
      <main className={styles.main}>
        {loading ? (
            <div
              className="flex w-full min-h-[300px] items-center justify-center">
              <h1 className={'text-red-300 text-5xl font-bold'}>Loading...</h1>
            </div>
          ) :

          searchLists.length > 0 ? (
            <section className={styles.features}>
              {searchLists.map((props, index) => (
                <div
                  key={index}
                  className={styles.cardWrapper}
                  style={{animationDelay: `${index * 0.1 + 0.1}s`}}
                >
                  <Card
                    {...props}
                    category={activeCategory}
                    title={props.name}
                    description={props.description}
                    Icon={() => null}
                    href={props.git_url}
                  />
                </div>
              ))}
            </section>
          ) : (
            <EmptyData/>
          )

        }

        {resultsCounts[activeCategory] > 0 &&
          <Pagination total={resultsCounts[activeCategory]}
                      defaultCurrent={pageNum}
                      onChange={handleClickPage}
                      defaultPageSize={per_page}
          />}

        <Footer/>

      </main>
    </div>

  );
};

export default App;
