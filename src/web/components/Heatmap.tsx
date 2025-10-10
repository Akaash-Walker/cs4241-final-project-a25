import {GeoJSON, MapContainer} from "react-leaflet"
import "leaflet/dist/leaflet.css";
import "./Heatmap.css"
import type {Feature, FeatureCollection, Geometry} from "geojson";
import axios from "axios";
import LoadCountriesTask from "../../tasks/LoadCountriesTask";
import {Layer, type PathOptions} from "leaflet";

type CountryProps = {
    color: string;
    ADMIN: string;
    ISO_A3: string;
};

async function getUserEmail(accessToken: string | null): Promise<string> {
    try {
        const res = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return res.data.email;
    } catch (error: unknown) {
        console.error("Error fetching user email:", error);
        throw new Error("Failed to fetch user email");
    }
}


const access_token = localStorage.getItem('access_token');
const username = await getUserEmail(access_token);

const Heatmap = ({countries}: { countries: FeatureCollection<Geometry, CountryProps> }) => {
    const baseStyle: PathOptions = {
        fillColor: "#404040ff",
        weight: 1,
        color: "#898989",
        fillOpacity: 1
    };


    const onEachCountry = (feature: Feature<Geometry, CountryProps>, layer: Layer) => {
        const name = feature.properties.ADMIN;
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.getArtists(feature.properties.ISO_A3, username).then((artists: string[]) => {
            const artistList = artists.join("<br>");
            if ("bindPopup" in layer && typeof (layer as any).bindPopup === "function") {
                (layer as any).bindPopup(`<b>${name}</b><br>${artistList}`);
            }
        });
    };


    return (
        <MapContainer className="h-[calc(82vh)]" zoom={2} center={[30, 0]} minZoom={2}>
            <GeoJSON
                data={countries}
                style={(feature) => ({
                    ...baseStyle,
                    fillColor: (feature?.properties as CountryProps | undefined)?.color ?? baseStyle.fillColor,
                })}
                onEachFeature={onEachCountry}
            />
        </MapContainer>
    )
}

export default Heatmap