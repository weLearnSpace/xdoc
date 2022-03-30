import { open, ask } from '@tauri-apps/api/dialog';
import Content from '../../components/Content';
import DragContent from '../../components/Drag';
import EditContent from '../../components/EditContent';
import FileBar from '../../components/FileBar';
import PreContent from '../../components/PreContent';
import './index.css';
import { HomeContext, useHomeState } from './model';

export interface IHomePageProps {
  [key: string]: any;
}

const HomePage: React.FC<IHomePageProps> = (props) => {
  const {} = props;
  const [homeState, HomeFuns] = useHomeState();
  const openDialog = () => {
    let properties: any = {
      defaultPath: null,
      directory: true,
      filters: [
        {
          extensions: ['txt', 'gif'],
          name: '*',
        },
      ],
    };

    open(properties)
      // ask('nihao', 'nihao')
      .then((pathStr: any) => {
        console.log(
          '🚀 ~ file: index.tsx ~ line 32 ~ .then ~ pathStr',
          pathStr
        );
        //   invoke('call_rust', { jsMsg: pathStr });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <HomeContext.Provider value={[homeState, HomeFuns]}>
      <div className="home_page">
        {/* <div onClick={openDialog}>123123</div> */}
        <DragContent
          initLeftWidth={200}
          minWidth={120}
          maxWidth={280}
          percentageLayout={false}
          left={(props) => {
            return <FileBar {...props} dataSource={homeState.fileTree} />;
          }}
          right={(props) => {
            return <Content {...props} />;
          }}
        />
      </div>
    </HomeContext.Provider>
  );
};

export default HomePage;
