import Axios from "axios";

const getRandomUser = async () => {
    const response = await Axios.get(
        "https://random-data-api.com/api/v2/users?size=2&is_xml=true",
        {
            headers: {},
            params: {
                is_xml: true,
                size: 1,
            },
        }
    );
    return response;
};

export { getRandomUser };