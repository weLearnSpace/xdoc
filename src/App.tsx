// import HomePage from './pages/Home';
import { dialog, event, updater } from '@tauri-apps/api';
import { useEffect } from 'react';
import './App.css';
import { HomeContext, useHomeState } from './pages/Home/model';

function App() {
  const [value, funs] = useHomeState();
  const checkUpdate = async () => {
    // const res = await notification.isPermissionGranted();
    // if (!res) {
    //   const permission = await notification.requestPermission();
    //   console.log(
    //     '🚀 ~ file: App.tsx ~ line 13 ~ checkUpdate ~ permission',
    //     permission
    //   );
    // }

    // await notification.sendNotification('nihao');
    // console.log('🚀 ~ file: App.tsx ~ line 11 ~ checkUpdate ~ res', res);
    const update = await updater.checkUpdate();

    console.log('🚀 ~ file: App.tsx ~ line 10 ~ checkUpdate ~ update', update);
  };

  useEffect(() => {
    event.listen('tauri://update', (e) => {
      console.log(e);
    });
    event.listen('tauri://update-available', async (e) => {
      const res = await dialog.confirm('有更新', '更新提示');
      console.log('🚀 ~ file: App.tsx ~ line 21 ~ event.listen ~ res', res);
      // await updater.installUpdate();
      console.log(e);
    });
    event.listen('tauri://update-download-progress', (e) => {
      console.log(e);
    });
    event.listen('tauri://update-install', (e) => {
      console.log(e);
    });
    event.listen('tauri://update-status', (e) => {
      console.log(e);
    });
  }, []);
  return (
    <HomeContext.Provider value={[value, funs]}>
      {/* <HomePage /> */}
      <div onClick={checkUpdate}>123123</div>
    </HomeContext.Provider>
  );
}

export default App;
