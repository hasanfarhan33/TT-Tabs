import React, { useEffect, useState } from 'react'; 
import {useNavigate} from 'react-router-dom'; 
import {useAuthContext} from "../hooks/useAuthContext"; 
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, elements, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios'


import HeaderComponent from "../components/HeaderComponent"; 

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement);

// colors: {
//     alabaster: "#FAFAFA", 
//     primary: '#C42A1F', 
//     secondary: '#212121', 
//     accent: '#F1F1F1', 
//     background: '#FAFAFA', 
//     text: '#333333', 
//     'button-primary': '#C42A1F',
//     'button-hover': '#A61C14', 
//     'bat-black': '#303030'
//   },


const StatsPage = () => {

    const {user} = useAuthContext(); 
    const [scoreDistributionData, setScoreDistributionData] = useState(); 
    const [topFiveOpponentsData, setTopFiveOpponentsData] = useState(); 

    const pieData = {
        labels: ['Wins', 'Losses'],
        datasets: [
            {
                data: [user.totalWins, user.totalMatches - user.totalWins],
                backgroundColor: ['#303030', '#E97777'], // Tailwind green-600 and red-600
            },
        ],
    };

    // Options for customizing the chart
    const pieOptions = {
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: 'Wins/Losses', 
            font: {
              family: 'Funnel Display, sans-serif',
              size: 20,
              weight: 'bold',
            },
            color: '#303030',
            position: 'bottom',
            padding: {
                top: 10, 
                bottom: 20
            }
          },
          legend: {
            position: 'top',
            labels: {
              font: {
                family: 'Funnel Display, sans-serif',
                size: 14,
                weight: "bold",
              },
              color: '#303030',
              boxWidth: 20, 
              boxHeight: 20, 
              padding: 10,
            },

          },
          tooltip: {
            bodyFont: {
              family: 'Funnel Display, sans-serif',
              size: 14,
            },
            backgroundColor: '#ffffff',
            titleFont: {
              family: 'Funnel Display, sans-serif',
              size: 16,
            },
            titleColor: '#1f2937',
            bodyColor: "#303030", 
            borderWidth: 2,
            borderColor: '#303030'
          },
        },

        // Hover animation 
        elements: {
            arc: {
                hoverOffset: 12
            }
        }, 

        layout: {
            padding: { 
                bottom: 30,
            }
        }
    };

    // Getting score distribution 
    useEffect(() =>{ 
      const getScoreDistribution = async () => {
        try {
          const scoreDistribution = await axios.get(`/api/stats/getScoreDistribution/${user._id}`)
          console.log(scoreDistribution.data)
          setScoreDistributionData(scoreDistribution.data);
        } catch (error) {
          console.error("Could not get score distribution data"); 
        }
      }

      const getTopFiveOpponents = async () => {
        try {
          const topFiveOpponents = await axios.get(`/api/stats/getTopFiveOpponents/${user._id}`) 
          console.log(topFiveOpponents.data); 
          setTopFiveOpponentsData(topFiveOpponents.data); 
        } catch (error) {
          console.error(`Could not get top five opponents`); 
        }
      }

      getScoreDistribution();
      getTopFiveOpponents(); 

    }, [])

    let scoreDistributionChartData = {}
    if(scoreDistributionData) {
      const scoreDistributionLabels = scoreDistributionData.map(item => item.range);
      const scoreDistributionValues = scoreDistributionData.map(item => item.count);
      
      scoreDistributionChartData = {
        labels: scoreDistributionLabels,
        datasets: [
          {
            data: scoreDistributionValues, 
            backgroundColor: "#E97777", 
            borderColor: "#303030",
            borderWidth: 2,
            borderRadius: 5,
            hoverBackgroundColor: "#A61C14",
          }
        ] 
      }

    }
    const barChartOptions = {
      responsive: true, 
      plugins: {
        legend: {
          display: false 
        }, 
        title: {
          display: false,
        }, 
        tooltip: {
          bodyFont: {
            family: 'Funnel Display, sans-serif',
            size: 14,
          },
          backgroundColor: '#ffffff',
          titleFont: {
            family: 'Funnel Display, sans-serif',
            size: 16,
          },
          titleColor: '#1f2937',
          bodyColor: "#303030", 
        },
      }, 
      scales: {
        y: {
          beginAtZero: true, 
          ticks:{ 
            color: "#303030", 
            font: {
              family: "Funnel Display, sans-serif", 
              weight: "bold"
            }
          }, 
          grid: {
            color: "#e5e5e5"
          }
        }, 
        x: {
          ticks: {
            color: "#303030", 
            font: {
              family: "Funnel Display, sans-serif", 
              weight: "bold"
            }
          }, 
          grid: {
            color: "#e5e5e5"
          }
        }
      }
    }

    let topFiveOpponentsChartData = {} 
    if(topFiveOpponentsData) {
      const topFiveOpponentsLabel = topFiveOpponentsData.map(item => item.displayName); 
      const topFiveOpponentsValues = topFiveOpponentsData.map(item => item.matchesPlayed); 

      topFiveOpponentsChartData = {
        labels: topFiveOpponentsLabel, 
        datasets: [
          {
            data: topFiveOpponentsValues, 
            backgroundColor: "#E97777", 
            borderColor: "#303030",
            borderWidth: 2,
            borderRadius: 5,
            hoverBackgroundColor: "#A61C14",
          }
        ]
      }
    }


    return(
      <>
      <HeaderComponent></HeaderComponent>
      <main className='p-8 font-mont bg-accent h-screen'>
          <motion.div 
              className='text-center mb-8' 
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 1}}
              >
              <h1 className='text-4xl font-funnel font-semibold text-bat-black'>Here are your stats, {user.displayName}</h1>
          </motion.div>

          <div className='flex flex-col w-full h-96'>
            {/* PIE CHART */}
              <motion.div className="flex flex-col gap-6 mb-8 rounded-lg w-full p-4 pb-8 bg-white border-2 border-b-4 border-bat-black hover:shadow-md transition-all" whileHover="hover">
                      <motion.h1
                          className="font-funnel text-2xl font-semibold relative w-fit cursor-default"
                      >
                          Wins/Losses
                          <motion.span
                          className="absolute left-0 bottom-1 h-[2px] bg-bat-black"
                          variants={{
                              initial: { width: 0 },
                              hover: { width: "100%" },
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          />
                      </motion.h1>
                  <Pie data={pieData} options={pieOptions}></Pie>
                  <p className='text-center font-semibold'>Win Rate: {Math.floor((user.totalWins/user.totalMatches) * 100)}%</p>
              </motion.div>

              {/* SCORE DISTRIBUTION CHART */}
              {scoreDistributionData && (
                <motion.div className='flex flex-col gap-6 mb-8 rounded-lg w-full p-4 pb-8 bg-white border-2 border-b-4 border-bat-black hover:shadow-md transition-all' whileHover="hover">
                  <motion.h1 className="font-funnel text-2xl font-semibold relative w-fit cursor-default">
                    Score Distribution
                    <motion.span
                      className="absolute left-0 bottom-1 h-[2px] bg-bat-black"
                      variants={{
                        initial: { width: 0 },
                        hover: { width: "100%" },
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </motion.h1>
                  <Bar data={scoreDistributionChartData} options={barChartOptions} />
                </motion.div>
              )}

              {/* TOP FIVE OPPONENTS */}
              {topFiveOpponentsData && (
                <motion.div className='flex flex-col gap-6 mb-8 rounded-lg w-full p-4 pb-8 bg-white border-2 border-b-4 border-bat-black hover:shadow-md transition-all' whileHover="hover">
                  <motion.h1 className="font-funnel text-2xl font-semibold relative w-fit cursor-default">
                    Top 5 Opponents
                    <motion.span
                      className="absolute left-0 bottom-1 h-[2px] bg-bat-black"
                      variants={{
                        initial: { width: 0 },
                        hover: { width: "100%" },
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </motion.h1>
                  <Bar data={topFiveOpponentsChartData} options={barChartOptions}></Bar>

                </motion.div>
              )}



          </div>

      </main>
      </>
    )
}

export default StatsPage; 