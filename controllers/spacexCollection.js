async function fetchLaunches() {
  const response = await axios.get("https://api.spacexdata.com/v4/launches");
  const launches = response.data.map((launchData) => {
    const {
      id,
      name,
      date_utc,
      details,
      success,
      links: { patch: { small: patchUrl } = {} } = {},
      rocket: { name: rocketName, type: rocketType } = {},
    } = launchData;

    return new Launch(
      id,
      name,
      new Date(date_utc),
      details,
      success,
      patchUrl,
      rocketName,
      rocketType
    );
  });
  return launches || [];
}
