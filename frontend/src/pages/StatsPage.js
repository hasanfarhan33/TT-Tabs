import React from 'react'; 
import {useNavigate} from 'react-router-dom'; 
import {useAuthContext} from "../hooks/useAuthContext"; 
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, elements } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

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

    const pieData = {
        labels: ['Wins', 'Losses'],
        datasets: [
            {
                data: [user.totalWins, user.totalMatches - user.totalWins],
                backgroundColor: ['#303030', '#C42A1F'], // Tailwind green-600 and red-600
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

    return(
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
            </motion.div>

        </div>

    </main>)
}

export default StatsPage; 