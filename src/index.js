import axios from "axios";
import flatMapDeep from "lodash/flatMapDeep";
import union from "lodash/union";
import slice from "lodash/slice";
import map from "lodash/map";
import filter from "lodash/filter";
import includes from "lodash/includes";
import sortBy from "lodash/sortBy";
import reverse from "lodash/reverse";
import { Host } from '../dist/types/model/host.model.d';

axios.get("data/host-app-data.json").then(({ data }) => {

  // limit 100
  // data = slice(data, 0, 100);

  const hostTree = map(union(flatMapDeep(data, (item => item.host))), (host, index) => {
    return {
      host,
      top15: slice(reverse(sortBy(filter(data, (item) => includes(item.host, host)), 'apdex')), 0, 5)
    }
  })

  console.log(hostTree);

});
