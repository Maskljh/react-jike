import { useEffect, useState } from "react";

import { getChannelAPI } from "@/apis/channel";
function useChannel(){
  const [channel, setChannle] = useState([]);
  const getChannelList = async () => {
    const res = await getChannelAPI();
    // console.log(res.data.channels);
    setChannle(res.data.channels);
  };
  useEffect(() => {
    getChannelList();
  }, []);
  return channel
}

export {useChannel}