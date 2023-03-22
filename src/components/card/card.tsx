import {ComponentProps, forwardRef} from "react";
import {formatNumber,timeAgo} from "utils/index";

import styles from "./card.module.css";

enum GitHubResource {
  Users = "users",
  Repositories = "repositories",
  Issues = "issues",
  Commits = "commits",
  Topics = "topics",
}


export interface CardProps
  extends Omit<ComponentProps<"div">, "className" | "children"> {
  title: string;
  description: string;
  Icon: (props: ComponentProps<"svg">) => JSX.Element | null;
  href: string;
  category: GitHubResource | string

  [props: string]: any;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({title, description, Icon, href,category, ...rest}, ref) => {
    return (
      <div ref={ref} className={styles.card} {...rest}>
        {category === GitHubResource.Repositories && (<>

          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <div className='w-full flex flex-row mb-1 flex-wrap '>
              {rest?.topics?.length > 0 && rest?.topics?.map((topic: string,key:number) => (
                <span className=' text-white mr-2 mt-1 px-[2px] py-[1x] border-[1px] rounded' key={key}>
                  {topic}
              </span>
              ))}
            </div>
            <div className='flex flex-row'>
              <div className='text-white mr-2'>🌟{formatNumber(rest?.stargazers_count)}</div>
              <div  className='text-white mr-2'>{rest?.license?.name}</div>
              <div className='text-white'>
                Updated  {timeAgo(rest?.updated_at)}
              </div>
            </div>
          </div>
          <div className={styles.callToActionContainer}>
            <a
              href={rest?.html_url}
              target="_blank"
              rel="noreferrer"
              className={styles.callToActionElement}
            >
              Visit documentation →
            </a>
          </div>
        </>)}
        {category === GitHubResource.Commits && (<>
          <div className={styles.content}>
            <h3 className={styles.title}>{rest?.repository?.owner?.login}/{rest?.repository?.name}</h3>
            <p className={styles.description}>
              <a  href={rest?.commit?.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.callToActionElement}>{rest?.commit?.message}</a>
            </p>
            <div className='flex flex-row'>
              <div className='text-green-400 font-bold mr-2'>{rest?.commit?.author?.name}</div>
              <div className='text-white'>
                committed  {timeAgo(rest?.commit?.author?.date)}
              </div>
            </div>
          </div>
        </>)}
        {category === GitHubResource.Issues && (<>
          <div className='flex flex-col flex-1 justify-start  '>
            <h3 className={styles.title}>{rest?.html_url.split('https://github.com/')[1].split(/(issues\/|pull\/)/)[0].slice(0,-1)} #{rest?.html_url.split('https://github.com/')[1].split(/(issues\/|pull\/)/)[2]}</h3>
            <p className='mt-2 text-base text-gray-300 flex-1 max-h-[50px] truncate'>{rest?.body}</p>

            <div className='flex flex-row'>
              <div  className='text-green-400 font-bold mr-2'>
                <a
                  href={rest?.user?.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {rest?.user?.login}
                </a>
              </div>
              <div className='text-white'>
                opened  {timeAgo(rest?.updated_at)}
              </div>
            </div>
          </div>
        </>)}
        {category === GitHubResource.Topics && (<>
          <div className={styles.content}>
            <h3 className={styles.title}>{rest?.name}</h3>
            <p className='mt-2 text-base text-gray-300 flex-1 max-h-[50px] truncate'>{rest?.short_description}</p>
            <div className='text-white'>
              created  {timeAgo(rest?.created_at)}
            </div>
          </div>
        </>)}
        {category === GitHubResource.Users && (<>
          <div className={styles.content}>
            <div className='flex py-[4px] flex-row items-center'>
              <img className='rounded inline' width='50px' height='50px' src={rest?.avatar_url}/>
              &nbsp;
              <span className={styles.title}  >
                {rest?.login}
              </span>
            </div>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.callToActionContainer}>
            <a
              href={rest?.html_url}
              target="_blank"
              rel="noreferrer"
              className={styles.callToActionElement}
            >
              Visit documentation →
            </a>
          </div>
        </>)}
      </div>
    )
  }
);

export default Card;
