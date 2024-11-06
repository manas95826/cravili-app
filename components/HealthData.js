import { Plugins } from '@capacitor/core';
const { HealthKit } = Plugins;

export default function HealthData() {
  const fetchHealthData = async () => {
    try {
      const result = await HealthKit.requestAuthorization({
        read: ['height', 'weight', 'stepCount'],
      });

      const steps = await HealthKit.getStepCount({
        startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
        endDate: new Date(),
      });
      console.log(steps);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={fetchHealthData}>Fetch Health Data</button>
    </div>
  );
}
